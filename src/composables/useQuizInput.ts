/**
 * A cheat/debug keyword handled before any catalog lookup. `isEnabled` is evaluated on every keystroke so reactive
 * flags such as debug mode are read at call time; a disabled command falls through to the normal lookup.
 */
export type QuizCommand = {
  keyword: string;
  isEnabled?: () => boolean;
  run: () => void;
};

/**
 * A rule applied to a recognized answer. Returning `true` consumes the input and stops the pipeline (either because the
 * answer was rejected, or because it is still a prefix of another remaining answer and must be left alone).
 */
export type QuizConstraint<TEntry> = (entries: TEntry[], isPartOfAnotherEntry: boolean) => boolean;

type Props<TEntry> = {
  /** Cheat keywords, evaluated in order before the catalog lookup. */
  commands?: QuizCommand[];
  /** Resolves the raw input to catalog entries, or nothing when unrecognized. */
  findEntries: (value: string) => TEntry[] | undefined;
  /** Whether the input is a strict prefix of another still-unfound answer. */
  isPartOfAnotherEntry: (value: string) => boolean;
  /** Called once the input matched an entry, before any constraint runs. */
  onRecognized?: (value: string) => void;
  /** Rules applied in order. Passed as a getter so callers may build them from helpers created after this composable. */
  constraints: QuizConstraint<TEntry>[] | (() => QuizConstraint<TEntry>[]);
  /** Applied when every constraint passed. */
  onSuccess: (entries: TEntry[]) => void;
};

/**
 * The catalog-agnostic guessing pipeline shared by the quizzes.
 *
 * Recognition stays automatic: every keystroke is checked and unrecognized input is left untouched so the player can
 * keep typing a longer name. There is no submission gesture.
 */
export const useQuizInput = <TEntry>({
  commands = [],
  findEntries,
  isPartOfAnotherEntry,
  onRecognized,
  constraints,
  onSuccess,
}: Props<TEntry>) => {
  const getConstraints = () => (typeof constraints === 'function' ? constraints() : constraints);

  const checkInput = (value: string) => {
    // First, run the debug commands
    for (const command of commands) {
      if (command.keyword !== value) continue;

      if (command.isEnabled && !command.isEnabled()) continue;

      command.run();
      return;
    }

    // Try to find if the current input matches any catalog entry. If not, leave it alone so the player can keep typing.
    const entries = findEntries(value);
    if (!entries || entries.length === 0) {
      return;
    }

    // Run the callback that an entry is recognized
    onRecognized?.(value);

    // Compute whether we have still unfound entries that start with the current input.
    // If so, we must leave it alone so the player can keep typing.
    const isPartOfAnother = isPartOfAnotherEntry(value);

    // Then check all constrains. If any returns true, the input is consumed and the pipeline stops.
    // For example: whether the pokemon is not available, already found, etc
    for (const constraint of getConstraints()) {
      if (constraint(entries, isPartOfAnother)) return;
    }

    // Finally run the success callback
    onSuccess(entries);
  };

  return { checkInput };
};

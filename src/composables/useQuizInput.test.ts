import { describe, expect, it, vi } from 'vitest';

import { useQuizInput, type QuizConstraint } from '@/composables/useQuizInput.ts';

type TestEntry = { name: string };

const setup = <TEntry = TestEntry>(overrides: Partial<Parameters<typeof useQuizInput<TEntry>>[0]> = {}) => {
  const onSuccess = vi.fn();
  const onRecognized = vi.fn();
  const findEntries = vi.fn<(value: string) => TEntry[] | undefined>(() => undefined);
  const isPartOfAnotherEntry = vi.fn(() => false);

  const { checkInput } = useQuizInput<TEntry>({
    findEntries,
    isPartOfAnotherEntry,
    onRecognized,
    constraints: [],
    onSuccess,
    ...overrides,
  });

  return { checkInput, onSuccess, onRecognized, findEntries, isPartOfAnotherEntry };
};

describe('useQuizInput', () => {
  it('leaves unrecognized input alone so a longer name can still be typed', () => {
    const { checkInput, onSuccess, onRecognized, isPartOfAnotherEntry } = setup();

    checkInput('pikach');

    expect(onRecognized).not.toHaveBeenCalled();
    expect(isPartOfAnotherEntry).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('ignores an empty match rather than accepting it', () => {
    const { checkInput, onSuccess, onRecognized } = setup({ findEntries: () => [] });

    checkInput('anything');

    expect(onRecognized).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('accepts a recognized answer when every constraint passes', () => {
    const entries = [{ name: 'pikachu' }];
    const passing = vi.fn<QuizConstraint<TestEntry>>(() => false);
    const { checkInput, onSuccess, onRecognized } = setup({
      findEntries: () => entries,
      constraints: [passing],
    });

    checkInput('pikachu');

    expect(onRecognized).toHaveBeenCalledExactlyOnceWith('pikachu');
    expect(passing).toHaveBeenCalledExactlyOnceWith(entries, false);
    expect(onSuccess).toHaveBeenCalledExactlyOnceWith(entries);
  });

  it('stops at the first constraint that consumes the input', () => {
    const first = vi.fn<QuizConstraint<TestEntry>>(() => false);
    const rejecting = vi.fn<QuizConstraint<TestEntry>>(() => true);
    const later = vi.fn<QuizConstraint<TestEntry>>(() => false);
    const { checkInput, onSuccess } = setup({
      findEntries: () => [{ name: 'pidgeot' }],
      constraints: [first, rejecting, later],
    });

    checkInput('pidgeot');

    expect(first).toHaveBeenCalledOnce();
    expect(rejecting).toHaveBeenCalledOnce();
    expect(later).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('tells constraints when the answer is still a prefix of another remaining answer', () => {
    const constraint = vi.fn<QuizConstraint<TestEntry>>(() => false);
    const { checkInput } = setup({
      findEntries: () => [{ name: 'pidgeot' }],
      isPartOfAnotherEntry: () => true,
      constraints: [constraint],
    });

    checkInput('pidgeot');

    expect(constraint).toHaveBeenCalledExactlyOnceWith([{ name: 'pidgeot' }], true);
  });

  it('evaluates the constraint getter on every keystroke', () => {
    const constraints = vi.fn(() => []);
    const { checkInput } = setup({ findEntries: () => [{ name: 'mew' }], constraints });

    checkInput('mew');
    checkInput('mew');

    expect(constraints).toHaveBeenCalledTimes(2);
  });

  describe('commands', () => {
    it('runs an enabled command instead of looking up the catalog', () => {
      const run = vi.fn();
      const { checkInput, findEntries } = setup({
        commands: [{ keyword: 'endGame', isEnabled: () => true, run }],
      });

      checkInput('endGame');

      expect(run).toHaveBeenCalledOnce();
      expect(findEntries).not.toHaveBeenCalled();
    });

    it('falls through to the catalog when the command is disabled', () => {
      const run = vi.fn();
      const { checkInput, findEntries } = setup({
        commands: [{ keyword: 'endGame', isEnabled: () => false, run }],
      });

      checkInput('endGame');

      expect(run).not.toHaveBeenCalled();
      expect(findEntries).toHaveBeenCalledExactlyOnceWith('endGame');
    });

    it('re-reads the enabled flag on every keystroke', () => {
      let debug = false;
      const run = vi.fn();
      const { checkInput } = setup({
        commands: [{ keyword: 'prefill', isEnabled: () => debug, run }],
      });

      checkInput('prefill');
      debug = true;
      checkInput('prefill');

      expect(run).toHaveBeenCalledOnce();
    });

    it('only matches the whole input, never a prefix', () => {
      const run = vi.fn();
      const { checkInput } = setup({ commands: [{ keyword: 'missingno', run }] });

      checkInput('missing');

      expect(run).not.toHaveBeenCalled();
    });
  });

  it('works with a non-Pokemon catalog', () => {
    type Move = { id: number; name: string; category: 'physical' | 'special' | 'status' };
    const thunderbolt: Move = { id: 85, name: 'thunderbolt', category: 'special' };
    const outOfScope = vi.fn<QuizConstraint<Move>>((entries) => entries[0].category === 'status');
    const { checkInput, onSuccess } = setup<Move>({
      findEntries: (value) => (value === 'thunderbolt' ? [thunderbolt] : undefined),
      constraints: [outOfScope],
    });

    checkInput('thunderbol');
    checkInput('thunderbolt');

    expect(onSuccess).toHaveBeenCalledExactlyOnceWith([thunderbolt]);
  });
});

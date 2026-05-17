import { computed } from 'vue';

import { useCurrentType } from '@/stores/useCurrentType';

export const TYPE_STYLE_KEYS = [
  '--type-bg-color',
  '--type-btn-color',
  '--type-dark-color',
  '--type-fg-color',
  '--type-inline-color',
  '--type-light-color',
  '--type-light-fg-color',
] as const;

type TypeStyleKey = (typeof TYPE_STYLE_KEYS)[number];
type TypeStyles = Partial<Record<TypeStyleKey, string>>;

export const useTypeStyles = () => {
  const { getCurrentTypeOrSpecial } = useCurrentType();

  return computed<TypeStyles>(() => {
    const type = getCurrentTypeOrSpecial();
    if (!type) {
      return {};
    }

    return {
      '--type-bg-color': type.bgColor,
      '--type-btn-color': type.buttonColor,
      '--type-dark-color': type.darkBgColor,
      '--type-fg-color': type.fgColor,
      '--type-inline-color': type.inlineColor,
      '--type-light-color': type.lightBgColor,
      '--type-light-fg-color': type.lightFgColor,
    };
  });
};

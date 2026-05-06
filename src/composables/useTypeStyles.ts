import { computed } from 'vue';

import { useCurrentType } from '@/stores/useCurrentType';

export const useTypeStyles = () => {
  const { getCurrentTypeOrSpecial } = useCurrentType();

  return computed(() => {
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

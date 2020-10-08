/**
 * @file
 * Localgov Content carousel behaviour.
 */

(Drupal => {
  Drupal.behaviors.localgovContentCarousel = {
    /**
     * Attach content carousel behaviour.
     *
     * @param {object} context
     *   DOM object.
     */
    attach(context) {
      const contentCarousels = context.querySelectorAll('.content-carousel');
      for (let i = 0; i < contentCarousels.length; i++) {
        const contentCarousel = contentCarousels[i].querySelectorAll(
          '.glide',
        )[0];
        this.init(contentCarousel, i);
      }
    },

    /**
     * Initialise carousel.
     *
     * @param {HTMLElement} contentCarousel
     *   Content carousel element.
     */
    init: function init(contentCarousel) {
      /* global Glide */
      const disableArrows = (Glide, Components) => {
        return {
          mount() {
            Glide.on(['mount.after', 'run'], () => {
              // Only do this for arrows controls.
              for (let i = 0; i < Components.Controls.items.length; i++) {
                const controlItem = Components.Controls.items[i];
                if (controlItem.className === 'glide__arrows') {
                  const leftArrow = controlItem.querySelector(
                    '.glide__arrow--left',
                  );
                  const rightArrow = controlItem.querySelector(
                    '.glide__arrow--right',
                  );

                  if (leftArrow) {
                    // Disable previous arrow on first slide, enable it on others.
                    if (Glide.index === 0) {
                      leftArrow.setAttribute('disabled', '');
                    } else {
                      leftArrow.removeAttribute('disabled');
                    }
                  }

                  if (rightArrow) {
                    // Disable next arrow on last slide, enable it on others.
                    if (
                      Glide.index ===
                      Components.Sizes.length - Glide.settings.perView
                    ) {
                      rightArrow.setAttribute('disabled', '');
                    } else {
                      rightArrow.removeAttribute('disabled');
                    }
                  }
                }
              }
            });
          },
        };
      };

      const carousel = new Glide(contentCarousel);
      carousel.mount({ disableArrows });
    },
  };
})(Drupal);
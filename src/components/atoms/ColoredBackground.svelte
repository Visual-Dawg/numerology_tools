<div class="max-w-screen fixed inset-0 -z-50 max-h-screen overflow-hidden">
  <div class="_bg bg-orange-200" />
</div>

<style lang="postcss">
  ._bg {
    position: fixed;
    height: 100vh;
    top: 0px;
    left: 0px;
    z-index: -999;
    isolation: isolate;
    contain: strict;
    width: 10px;

    /* Use 5 collums of the 12 as width + all the space to the left. 
      Max-width is set to 1600px
      */
    width: calc(
      ((min(100vw, 1600px) - 11 * 24px) / 12 * 5 + 24px * 5) +
        max(0px, (100vw - 1600px) / 2)
    );

    @media screen and (max-width: 765px) {
      transform: rotate(45deg) scale(2) translate(-50%, 0px);
      width: 100vw;
      position: absolute;
    }
  }
</style>

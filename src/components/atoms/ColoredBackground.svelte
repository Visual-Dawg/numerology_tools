<div class="_bg" />

<style lang="postcss">
  ._bg {
    background-color: theme(colors.orange.200);
    position: fixed;
    height: 100vh;
    top: 0px;
    left: 0px;
    z-index: -999;

    /* Use 5 collums of the 12 as width + all the space to the left. 
      Max-width is set to 1600px
    */
    width: calc(
      ((min(100vw, 1600px) - 11 * 24px) / 12 * 5 + 24px * 5) +
        max(0px, (100vw - 1600px) / 2)
    );
  }
</style>

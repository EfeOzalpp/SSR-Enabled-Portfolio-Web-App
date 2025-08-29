// Named chunk keeps it out of the main bundle and gives a stable file name.
export const loadFocusedDetails = () =>
  import(/* webpackChunkName: "focused-details" */ '../case-studies/FocusedDetails');

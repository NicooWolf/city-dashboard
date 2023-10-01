export const getIsFetching = (isFetching: boolean | undefined): boolean => {
  return (
    isFetching !== undefined && isFetching !== null && isFetching !== false
  );
};

export const handleCardStates = (
  spinnerState: boolean,
  cardState: boolean,
  isFetching: boolean | undefined
): any => {
  const loading = getIsFetching(isFetching);

  spinnerState = loading;
  cardState = !loading && isFetching !== undefined;

  return { spinnerState, cardState };
};

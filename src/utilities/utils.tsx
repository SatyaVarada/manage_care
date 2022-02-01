import { DISTRICT, NONE, STATE } from "./constants";

export const displayErrorMessage = (errorMessage: string) => (
  <p style={{ color: 'red' }}>{errorMessage}</p>
)

export const filterOptions = [NONE, STATE, DISTRICT];
import * as React from 'react';
import styled from 'styled-components';

const LIGHT = 'light';
const DARK = 'dark';
const STORAGE_KEY = 'dark-mode-toggle';

type Mode = typeof LIGHT | typeof DARK;

let initialMode: Mode = LIGHT;


const getModeFromStorage = (): Mode | null => {
  if (typeof localStorage === 'undefined') return null;

  const result = localStorage.getItem(STORAGE_KEY);
  if (result === LIGHT || result === DARK) return result as Mode;
  return null;
};

const storeModeToStorage = (mode: Mode): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, mode);
};

const setInitialMode = (): void => {
  const storedMode = getModeFromStorage();
  if (storedMode !== null) {
    initialMode = storedMode;
    return;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    initialMode = DARK;
  }
};

// set initial mode
if (typeof window !== 'undefined') {
  setInitialMode();
}
storeModeToStorage(initialMode);

const DarkModeToggle: React.FC<{}> = () => {
  const [mode, updateMode] = React.useState<Mode>(initialMode);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const { body } = document;

    if (mode === DARK) {
      body.classList.add('dark');
      body.classList.remove('light');
      storeModeToStorage(DARK);
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
      storeModeToStorage(LIGHT);
    }
  }, [mode]);

  const toggleMode = (): void => {
    switch (mode) { // eslint-disable-line
      case LIGHT:
        updateMode(DARK);
        break;
      case DARK:
        updateMode(LIGHT);
        break;
    }
  };

  return (
    <Wrapper onClick={toggleMode}>
      {mode === LIGHT ? (
        <p>light</p>
      ) : (
        <p>dark</p>
      )}
    </Wrapper>
  );
};
export default DarkModeToggle;

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: #42A5F5;
`;

import * as React from 'react';

const LIGHT = 'light';
const DARK = 'dark';
const STORAGE_KEY = 'dark-mode-toggle';

type Mode = typeof LIGHT | typeof DARK;

type ModeContextType = () => void;
const ModeContext = React.createContext<ModeContextType>(() => {});

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

const getInitialMode = (): Mode => {
  if (typeof window === 'undefined') return LIGHT;

  const storedMode = getModeFromStorage();
  if (storedMode !== null) {
    return storedMode as Mode;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return DARK;
  }
  return LIGHT;
};

const initialMode = getInitialMode();

interface Props {
  children: any;
}
const ModeContextProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>(initialMode);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const { body } = document;

    switch (mode) { // eslint-disable-line
      case LIGHT:
        body.classList.add(LIGHT);
        body.classList.remove(DARK);
        break;
      case DARK:
        body.classList.add(DARK);
        body.classList.remove(LIGHT);
    }
    storeModeToStorage(mode);
  }, [mode]);

  const toggleMode = (): void => {
    switch (mode) { // eslint-disable-line
      case LIGHT:
        setMode(DARK as Mode);
        break;
      case DARK:
        setMode(LIGHT as Mode);
        break;
    }
  };

  return (
    <ModeContext.Provider value={toggleMode}>
      {children}
    </ModeContext.Provider>
  );
};

export {
  ModeContext,
  ModeContextType, // eslint-disable-line no-undef
  ModeContextProvider,
};

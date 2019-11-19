import * as React from 'react';
import styled from 'styled-components';
import SocialIcon from '../atoms/socialIcon';
import { ModeContext, ModeContextType } from '../../context/mode';

interface Link {
  url: string;
  name: string;
  icon: string | { light: string; dark: string };
}
interface Props {
  links: Link[];
}

const SocialIcons: React.FC<Props> = ({ links }) => {
  const mode = React.useContext<ModeContextType>(ModeContext);

  return (
    <IconsWrapper>
      {links.map(({ url, name, icon }) => {
        if (typeof icon !== 'string') {
          const modeIcon = mode === 'dark' ? icon.dark : icon.light;
          return (
            <SocialIcon
              url={url}
              name={name}
              icon={modeIcon}
              key={name}
            />
          );
        }
        return (
          <SocialIcon
            url={url}
            name={name}
            icon={icon}
            key={name}
          />
        );
      })}
    </IconsWrapper>
  );
};
const IconsWrapper: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;
export default SocialIcons;

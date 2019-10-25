import { h } from 'preact';
import styled from 'styled-components';
import SocialIcon from '../atoms/socialIcon';
import info from '../info';

/** @jsx h */
export default () => (
  <IconsWrapper>
    {info.links.map(({
      url,
      name,
      icon,
    }) => (
      <SocialIcon
        url={url}
        name={name}
        icon={icon}
        key={name}
      />
    ))}
  </IconsWrapper>
);
const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;
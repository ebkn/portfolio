import * as React from 'react';
import styled from 'styled-components';

interface Props {
  url: string;
  name: string;
  icon: string;
}
const SocialIcon: React.FC<Props> = ({ url, name, icon }: Props) => (
  <IconWrapper>
    <StyledLink href={url} target="_blank" rel="noopener">
      <StyledImg src={`/images/${icon}`} alt={name} />
    </StyledLink>
  </IconWrapper>
);
const IconWrapper: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;
const StyledLink: any = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
const StyledImg: any = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
export default SocialIcon;

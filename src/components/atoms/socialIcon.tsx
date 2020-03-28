import * as React from 'react';
import styled from 'styled-components';

interface Props {
  url: string;
  name: string;
  icon: string;
}

export const SocialIcon: React.FC<Props> = ({ url, name, icon }: Props) => (
  <IconWrapper>
    <StyledLink href={url} target="_blank" rel="noopener">
      <Img src={`/images/${icon}`} alt={name} />
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
const Img: any = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

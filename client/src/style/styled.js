import styled from 'styled-components'

export const Div = styled.div`
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  margin-left: ${(props) => props.left};
  margin-top: ${(props) => props.top};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => props.wrap};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
`
export const Text = styled.p`
  font-feature-settings: 'pnum' on, 'lnum' on;
  font-family: Mulish;
  font-style: normal;
  font-size: ${(props) => props.size};
  line-height: ${(props) => props.lineHeight};
  font-weight: 700;
  color: #333333;
  cursor: 'pointer';
`
export const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #44aa95;
  border-color: #44aa95;
`

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
export const Header = styled.div`
  box-shadow: 0 0px 20px 0px rgb(0 0 0 / 10%);
  padding-left: 32px;
  padding-right: 32px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`
export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 64px;
  width: 100%;
`
export const MenuWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const Logo = styled.div`
  display: flex;
  flex-direction: row;
`
export const MenuItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  margin: 0px;
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

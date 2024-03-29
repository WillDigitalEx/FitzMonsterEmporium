import styled, { css } from 'styled-components';
import theme from '../../theme';

const shrinkLabelMixin = css`
  top: -14px;
  font-size: 12px;
  color: ${theme.mainColor};
`
export const InputFieldLabel = styled.label`
  color: ${theme.mainColor};
  font-size: 1em;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0.313rem;
  top: 0.625rem;
  transition: 300ms ease all;

  ${({shrink}) => shrink && shrinkLabelMixin};
`
export const FormFields = styled.div`
  position: relative;
  margin: 45px 0;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`
export const InputField = styled.input`
  background: none;
  background-color: transparent;
  color: ${theme.mainColor};
  font-size: 1.1em;
  padding: 0.625rem 0.625rem 0.625rem 0.313rem;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${theme.mainColor};
  margin: 1.563em 0;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelMixin};
  }

  &:autofill ~ label {
    ${shrinkLabelMixin};
  }
  &:-webkit-autofill, &:-webkit-autofill:active, &:-webkit-autofill:hover, &:-webkit-autofill:focus {
    -webkit-transition: background-color 5000s ease-in-out 0s;
  }
`


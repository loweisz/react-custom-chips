import styled, { keyframes } from 'styled-components';

export const ChipsInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  min-height: 50px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 100%;
  margin-left: 10px;
  position: relative;
  input {
    font-size: 1rem;
    line-height: 26px;
    letter-spacing: 0.3px;
    outline: none;
    margin-left: 5px;
    background-color: rgba(0,0,0,0);
    &:focus {
        border: none;
        outline: none;
    }
    &::placeholder {
        color: ${({ theme }) => theme.lls_text_grey};
        opacity: 1;
    }
  }
`;

export const InputContainer = styled.div`
  height: auto;
  align-items: center;
  display: flex;
  flex: 1;
`;

export const SearchContainer = styled.div`
  width: 100%;
`;

export const SearchInputContainer = styled.div`
  display: block;
  align-items: center;
  padding-right: 5px;
  & input {
    width: 100%;
    min-width: 200px;
    border: none;
  }
`;

export const ResultsContainer = styled.div`
  position: absolute;
  width: 100%;
  overflow-y: auto;
  z-index: 999;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, .19);
  left: 0;
`;

export const NothingFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid white;
  height: 60px;
  color: ${({ theme }) => theme.lls_text_grey};
  background-color: white;
`;

const growChip = keyframes`
  0% {
    transform: scale(0)
  }
  60% {
    transform: scale(1.1)
  }
  100% {
    transform: scale(1)
  }
`;

export const Chip = styled.div`
  padding: 5px 10px 5px 10px;
  margin: 5px;
  text-transform: uppercase;
  display: flex;
  border-radius: 50px;
  background-color: slategrey;
  font-size: 12px;
  font-weight: 600;
  line-height: 2.17;
  letter-spacing: 0.2px;
  align-items: center;
  color: white;
  animation: ${growChip} 250ms cubic-bezier(0.32, 0.62, 0.2, 0.88);
  cursor: pointer;
  > div {
    margin-left: 10px;
    height: 24px;
    width: 24px;
    color: white;
  }
  &:hover {
    &:after {
      display: block;
    }
  }
`;

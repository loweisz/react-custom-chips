import styled from '@emotion/styled';

export const ChipsInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  min-height: 60px;
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
  border-top: 1px solid ${({ theme }) => theme.lls_light_white};
  height: 60px;
  color: ${({ theme }) => theme.lls_text_grey};
  background-color: ${({ theme }) => theme.lls_white};
`;


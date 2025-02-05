'use client';

import { srOnly } from '@/app/globalStyles';
import { ChangeEvent, FormEvent, useId } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const StyledForm = styled.form`
  padding: 0.8125rem 1.6875rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 1.875rem;
  border: 1px solid var(--disabled);
  padding: 0.6875rem 1.1875rem;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.3125rem;
  letter-spacing: -0.02rem;

  &::placeholder {
    color: var(--gray);
    font-weight: 700;
  }
`;

const SearchLabel = styled.label`
  ${srOnly}
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--disabled);
  font-size: 1.5rem;
  padding: 0;
`;

/* ---------------------------------- type ---------------------------------- */
type SearchFormProps = {
  onSubmit: (e: FormEvent) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/* -------------------------------- component ------------------------------- */
const SearchForm = ({ onSubmit, onInputChange }: SearchFormProps) => {
  const searchInputId = useId();

  return (
    <StyledForm onSubmit={onSubmit}>
      <SearchInputWrapper>
        <SearchLabel htmlFor={searchInputId}>검색</SearchLabel>
        <SearchInput
          id={searchInputId}
          type="text"
          name={'search-word'}
          placeholder="검색어를 입력하세요"
          onChange={onInputChange}
        />

        <SearchButton type="submit">
          <HiMiniMagnifyingGlass />
        </SearchButton>
      </SearchInputWrapper>
    </StyledForm>
  );
};

export default SearchForm;

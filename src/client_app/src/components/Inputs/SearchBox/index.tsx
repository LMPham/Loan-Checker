import { debounce } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { InputBox, ClearIcon, SearchIcon, Wrapper } from './styles';

type Props = {
  defaultValue: string | undefined;
  onSearchChanged: (value: string | undefined) => void;
};

function SearchBox({ defaultValue, onSearchChanged }: Props) {
  const [searchText, setSearchText] = useState<string | undefined>(
    defaultValue,
  );

  const onSearchDispatch = useCallback(
    (value: string | undefined) => {
      onSearchChanged(value !== '' ? value : undefined);
    },
    [onSearchChanged],
  );

  const debouncedSearch = useMemo(
    () => debounce((nextValue: string) => onSearchDispatch(nextValue), 250),
    [onSearchDispatch],
  );

  const debounceSearchText = React.useCallback(
    (searchText: string) => debouncedSearch(searchText),
    [debouncedSearch],
  );

  return (
    <Wrapper>
      <InputBox
        value={searchText}
        placeholder="Search..."
        maxLength={255}
        onChange={(e) => {
          setSearchText(e.target.value);
          debounceSearchText(e.target.value);
        }}
      />
      <SearchIcon />
      {searchText && (
        <ClearIcon
          className="cursor-pointer text-red"
          onClick={() => {
            setSearchText('');
            onSearchDispatch(undefined);
          }}
        />
      )}
    </Wrapper>
  );
}

export default SearchBox;

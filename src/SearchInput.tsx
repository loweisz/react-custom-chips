import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { ChipData } from './chip.interface';
import { useSuggestionInput } from './useSuggestionInput';

interface DefaultProps {
  inputClassName: string;
  setInputRef: (input: HTMLInputElement) => void;
  handleClickOutside?: (event: Event) => void;
  emptyMessage: string;
  inputPlaceholder: string;
  loadingSpinner: JSX.Element;
}

interface OwnProps extends DefaultProps {
  fetchSearchSuggestions?: (value: string) => Promise<ChipData[]>;
  suggestionList?: ChipData[];
  minLength: number;
  debounceTimeout: number;
  handleSelectElement: (item: ChipData, callback?: () => void) => void;
  renderListItem: (selected: boolean, value: ChipData, handleSelect: (val: ChipData) => void) => JSX.Element;
  filter?: string;
}

type Props = OwnProps;

const SearchInput: FC<Props> = (props) => {
  const inputNode = useRef<HTMLInputElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    boxTopPosition,
    checkHeight,
    addEventListener,
    removeEventListener,
    selectedIndex,
    onKeyPress,
  } = useSuggestionInput(inputContainerRef);

  const [hitList, setHitList] = useState<ChipData[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    checkHeight();
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      removeEventListener();
    };
  }, []);

  const handleClickOutside = (event: Event) => {
    if (inputContainerRef.current) {
      const node = inputContainerRef.current;
      // @ts-ignore
      if (node && !node.contains(event.target)) {
        setNothingFound(false);
        setHitList([]);
        if (props.handleClickOutside) {
          props.handleClickOutside(event);
        }
      }
    }
  };

  const clearAndHide = () => {
    if (nothingFound || hitList.length > 0 || (inputNode.current && inputNode.current.value)) {
      setNothingFound(false);
      setHitList([]);
      if (inputNode.current) {
        inputNode.current.value = '';
        inputNode.current.focus();
      }
    }
  };

  const selectClickedElement = (value: ChipData) => {
    props.handleSelectElement(value, clearAndHide);
    clearAndHide();
  };

  const selectCurrentElement = () => {
    props.handleSelectElement(
      hitList[selectedIndex],
      clearAndHide,
    );
    clearAndHide();
  };

  const searchAction = async (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (value.trim().length === 0) {
      setNothingFound(true);
      setLoadingSuggestions(false);
      return;
    }
    if (props.fetchSearchSuggestions) {
      setLoadingSuggestions(true);
      props.fetchSearchSuggestions(value)
        .then((list) => {
          if (list.length === 0) {
            setNothingFound(true);
          } else {
            setNothingFound(false);
          }
          setHitList(list);
          setLoadingSuggestions(false);
          checkHeight();
        })
        .catch(() => {
          setHitList([]);
        });
      return;
    }
    if (props.suggestionList) {
      setNothingFound(false);
      setHitList(props.suggestionList);
      checkHeight();
    }
  };

  const setNode = (passedInputNode: HTMLInputElement | null) => {
    if (passedInputNode) {
      inputNode.current = passedInputNode;
      if (props.setInputRef) {
        props.setInputRef(passedInputNode);
      }
    }
  };

  const onKeyDownItem = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      onKeyPress(
        event,
        hitList.length,
        selectCurrentElement,
        scrollContainerRef.current,
      );
    }
  };

  return (
    <div
      className="input_container"
      ref={inputContainerRef}
      onKeyDown={onKeyDownItem}
    >
      <div className="search_container">
        <div className="search_container_input">
          <input
            ref={setNode}
            className={props.inputClassName}
            placeholder={props.inputPlaceholder}
            onChange={searchAction}
            onFocus={addEventListener}
            onBlur={removeEventListener}
          />
        </div>
        <div
          className="results_container"
          style={{ maxHeight: `calc(100vh - ${(boxTopPosition || '100')}px)` }}
          ref={scrollContainerRef}
        >
          {loadingSuggestions ? (
            <div>
              <div className="nothing_found_container">
                {props.loadingSpinner}
              </div>
            </div>
          ) : (
            <div>
              {nothingFound
                ? (
                  <div className="nothing_found_container">
                    {props.emptyMessage}
                  </div>
                )
                : (
                  <span>
                    {hitList.map((item, index) => (
                      props.renderListItem(
                        selectedIndex === index,
                        item,
                        selectClickedElement,
                      )
                    ))}
                  </span>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SearchInput.defaultProps = {
  inputClassName: '',
  setInputRef: () => null,
  handleClickOutside: () => null,
  emptyMessage: 'empty',
  inputPlaceholder: 'Search',
  loadingSpinner: <div>loading</div>,
};

export default SearchInput;

import { useRef, useState } from 'react';
import React from 'react';

export const useSuggestionInput = (containerNode: React.MutableRefObject<HTMLDivElement | null>) => {
  const elementHeight = 60;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [boxTopPosition, setBoxTopPosition] = useState<null | number>(null);
  const [offset, setOffset] = useState<null | number>(null);

  const addEventListener = () => {
    window.addEventListener('scroll', checkHeight);
  };

  const removeEventListener = () => {
    window.removeEventListener('scroll', checkHeight);
  };

  const targetNode = useRef<HTMLDivElement | null>(containerNode.current);

  const increaseListIndex = (num: number) => {
    setSelectedIndex((s) => s + num);
  };

  const scrollUp = (scrollContainer: HTMLElement, listLength: number) => {
    const tmpContainer = scrollContainer;
    if (listLength > 0 && tmpContainer) {
      const topOffsetElements = Math.ceil(tmpContainer.scrollTop / elementHeight);
      if (selectedIndex === topOffsetElements) {
        tmpContainer.scrollTop = (topOffsetElements - 1) * elementHeight;
      }
    }
  };

  const scrollDown = (scrollContainer: HTMLElement, listLength: number) => {
    const tmpContainer = scrollContainer;
    if (listLength > 0 && tmpContainer) {
      const containerHeight = tmpContainer.offsetHeight;
      const maxFullContainElements = Math.floor(containerHeight / elementHeight);
      const splittedElementHeight = containerHeight % elementHeight;
      const needToScroll = elementHeight - splittedElementHeight;
      if (maxFullContainElements - 1 === selectedIndex) {
        tmpContainer.scrollTop = needToScroll;
      }
      if (maxFullContainElements - 1 < selectedIndex) {
        tmpContainer.scrollTop += elementHeight;
      }
    }
  };

  const onKeyPress = (
    event: React.KeyboardEvent<any>,
    listLength: number,
    handleSelectElement: (e: React.KeyboardEvent<any>) => void,
    scrollContainer: HTMLElement,
  ) => {
    switch (event.key) {
      case 'ArrowDown': {
        scrollDown(scrollContainer, listLength);
        if (selectedIndex === -1) {
          setSelectedIndex(0);
        } else if (selectedIndex < listLength - 1) {
          increaseListIndex(1);
        }
        break;
      }
      case 'ArrowUp': {
        scrollUp(scrollContainer, listLength);
        if (selectedIndex > 0) {
          increaseListIndex(-1);
        }
        break;
      }
      case 'Enter': {
        event.preventDefault();
        if (selectedIndex !== -1) {
          handleSelectElement(event);
          setSelectedIndex(-1);
        }
        break;
      }
      default:
        break;
    }
  };

  const checkHeight = () => {
    const node = targetNode.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      const tmpBoxTopPosition = rect.top + rect.height + 55;
      const tmpOffset = rect.top;
      if (boxTopPosition !== tmpBoxTopPosition) {
        setBoxTopPosition(tmpBoxTopPosition);
      }
      if (tmpOffset !== offset) {
        setOffset(tmpOffset);
      }
    }
  };

  return ({
    addEventListener,
    removeEventListener,
    boxTopPosition,
    onKeyPress,
    selectedIndex,
    checkHeight,
    offset,
  });
};

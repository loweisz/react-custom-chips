import React, { FC } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { RemovableChipData } from './chip.interface';

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

const Chip = styled.div`
  padding: 5px 10px 5px 5px;
  margin: 5px;
  text-transform: uppercase;
  display: flex;
  border-radius: 50px;
  background-color: lightgrey;
  font-size: 12px;
  font-weight: 600;
  line-height: 2.17;
  letter-spacing: 0.2px;
  align-items: center;
  color: darkgrey;
  animation: ${growChip} 250ms cubic-bezier(0.32, 0.62, 0.2, 0.88);
  position: relative;
  cursor: pointer;
  &:after {
    pointer-events: none;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background-color: black;
    opacity: 0.1;
    margin-left: -5px;
    display: none;
  }
  > span {
    margin-left: 10px;
  }
  &:hover {
    &:after {
      display: block;
    }
  }
`;

interface Props {
  value: RemovableChipData;
}

const SampleChip: FC<Props> = ({ value }) => {
  const removeThisChip = () => value.onRemove(value);
  return (
    <Chip>{value.name} <span onClick={removeThisChip}>X</span></Chip>
  );
}

export default SampleChip;

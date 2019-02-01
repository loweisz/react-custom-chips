import React, { FC } from 'react';
import {ChipData} from "./chip.interface";

interface Props {
  value: ChipData;
}

const SampleChip: FC<Props> = ({ value }) => (
  <div>{value.name}</div>
);

export default SampleChip;

import React, { FC } from 'react';
import {ChipData} from "./chip.interface";

interface Props {
  value: ChipData;
}

const SampleChip: FC<Props> = ({ value }) => (
  <div style={{ backgroundColor: 'green'}}>{value.name}</div>
);

export default SampleChip;

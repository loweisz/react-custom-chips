export interface ChipData {
  id: string;
  name: string;
}

export interface RemovableChipData extends ChipData{
  onRemove: (chip: ChipData) => void;
}

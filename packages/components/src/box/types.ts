import type { SxProps } from "@yith/styles";
import type React from 'react';

export type BoxProps = Omit<React.ComponentProps<'div'> & { sx?: SxProps }, 'ref'>;
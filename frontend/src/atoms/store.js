import { atom } from 'jotai';
import { atomWithStorage} from 'jotai/utils';

export const userAtom = atomWithStorage('user', {});

export const productAtom = atom([]);
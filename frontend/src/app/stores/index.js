import { atom } from 'recoil';

export const isUploadedState = atom({
	key: 'uploadedState',
	default: true,
});

export const isListState = atom({
	key: 'isListState',
	default: [],
});

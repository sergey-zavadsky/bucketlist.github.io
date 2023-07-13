import { atom } from 'recoil';

export const isUploadedState = atom({
	key: 'uploadedState',
	default: true,
});

export const isCountState = atom({
	key: 'isCountState',
	default: 0,
});

export const isListState = atom({
	key: 'isListState',
	default: [],
});

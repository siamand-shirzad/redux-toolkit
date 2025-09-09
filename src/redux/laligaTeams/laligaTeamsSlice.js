import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	isFetching: false,
	teams: [],
	error: ''
};

export const getLaligaTeams = createAsyncThunk('team/getLaligaTeams', async () => {
	const res = await axios.get(
		'https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4335&s=2025-2026'
	);
	return res.data.table;
});

const laligaTeamsReducer = createSlice({
	name: 'team',
	initialState,
	extraReducers: builder => {
		builder.addCase(getLaligaTeams.pending, state => {
			if (state.teams.length > 0) {
				state.isFetching = true;
			} else {
				state.isLoading = true;
				state.isFetching = true;
			}
		});
		builder.addCase(getLaligaTeams.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isFetching = false;
			state.teams = action.payload;
			state.error = '';
		});
		builder.addCase(getLaligaTeams.rejected, (state, action) => {
			state.isLoading = false;
			state.isFetching = false;
			state.teams = [];
			state.error = action.error.message;
		});
	}
});

export default laligaTeamsReducer.reducer;

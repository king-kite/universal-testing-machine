import { ref, onValue, set } from 'firebase/database';

import { db } from './config';
import { handleError } from './utils';

const databaseName = '/UTM2';

// Read the parameters from the realtime database
export async function getData(dataRef = '', options = {}) {
	const { onError, onSuccess } = options;
	try {
		// get reference to data
		const reference = ref(db, databaseName + dataRef);

		onValue(reference, (snapshot) => {
			if (snapshot.exists()) {
				const value = snapshot.val();
				if (onSuccess) onSuccess(value);
			} else if (onError) onError({ message: 'Unable to get route data.' });
		});
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	}
}

// Reset the parameters on the realtime database
export async function setData(dataRef = '', data, options = {}) {
	const { onError, onSuccess } = options;
	try {
		// get the reference to the parameters data
		const reference = ref(db, databaseName + dataRef);

		// set data on reference
		await set(reference, data);

		if (onSuccess) onSuccess(data);
		return { data };
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	}
}

import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
} from 'firebase/firestore';

import { firestore } from './config';
import { handleError } from './utils';

const reference = 'tests';

function getDateString(value) {
	let date = value.getDate();
	let month = value.getMonth() + 1;
	let year = value.getFullYear();
	date = date > 9 ? date : date.toString().padStart(2, '0');
	month = month > 9 ? month : month.toString().padStart(2, '0');
	year = year > 999 ? year : year.toString().padStart(4, '0');
	return `${year}-${month}-${date}`;
}

// Get the serialized test data from the document
function serializeTest(doc) {
	const info = doc.data();

	return {
		id: doc.id,
		name: info.name,
		type: info.type,
		length: info.length,
		extension: info.extension,
		forces: info.forces,
		date: info.date ? getDateString(info.date.toDate()) : undefined,
	};
}

// Get the tests data from the firestore
export function getTests() {
	return new Promise((resolve, reject) => {
		try {
			// Get the tests data from the firestore collection
			// and order by date in descending order
			const testsRef = collection(firestore, reference);
			getDocs(query(testsRef, orderBy('date', 'desc')))
				.then((tests) => {
					// Get the data from each doc in the tests array
					const data = tests.docs.map((doc) => serializeTest(doc));
					resolve(data);
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}

// Get single test data from the firestore
export function getTest({ id }) {
	return new Promise((resolve, reject) => {
		try {
			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Get the test data from the firestore
			const testRef = doc(firestore, reference, id);
			getDoc(testRef)
				.then((document) => {
					// Get the data from the document
					const data = serializeTest(document);
					resolve(data);
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}

// Add test data to the firestore
export function addTest({ data }) {
	return new Promise((resolve, reject) => {
		try {
			// Check data is provided
			if (!data) throw new Error('Test data is required!');

			// Structure the data to be saved
			const test = {
				name: data.name,
				type: data.type,
				length: data.length,
				extension: data.extension,
				forces: data.forces,
				date: Timestamp.fromDate(new Date()),
			};

			// Save the test document
			addDoc(collection(firestore, reference), test)
				.then((doc) => {
					resolve({
						id: doc.id,
						...data,
					});
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}

// Delete test data from the firestore
export function deleteTest({ id }) {
	return new Promise((resolve, reject) => {
		try {
			// Check id is valid
			if (!id) throw new Error('An ID was not provided!');

			// Delete the test
			deleteDoc(doc(firestore, reference, id))
				.then(() => {
					resolve({
						message: 'Test with the specified Id was deleted successfully!',
					});
				})
				.catch((err) => {
					const error = handleError(err);
					reject(error);
				});
		} catch (err) {
			const error = handleError(err);
			reject(error);
		}
	});
}

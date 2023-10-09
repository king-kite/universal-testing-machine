/* eslint-disable react/prop-types */
import { Alert, Button, Modal } from 'antd';
import React from 'react';
// import { useNavigate } from 'react-router-dom';

import { Input } from './controls';
// import routes from '../config/routes';

import { useCreateTestMutation } from '../store/features/api/tests';
// import { useNotificationContext } from '../../store/contexts';

function FormComponent(props, ref) {
	// track the modal state
	const [open, setOpen] = React.useState(false);

	const [error, setError] = React.useState();

	const [form, setForm] = React.useState({});

	const handleChange = React.useCallback((name, value) => {
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	// const { api } = useNotificationContext();

	// const navigate = useNavigate();

	// create user mutation
	const [createTest, { error: testError, reset, status, isLoading: loading }] =
		useCreateTestMutation();

	const handleCreateTest = React.useCallback(
		(data) => {
			createTest(data);
		},
		[createTest]
	);

	// Reset the modal
	const resetModal = React.useCallback(() => {
		setOpen(false);
		setForm({});
		reset();
	}, [reset]);

	// Listen for errors in when creating tests
	React.useEffect(() => {
		setError(testError);
	}, [testError]);

	// Successful creation of test
	React.useEffect(() => {
		// show notification
		if (status === 'fulfilled') {
			resetModal();
			window.alert('Test saved successfully!');
			// // api.success({
			// // 	message: 'Test Saved.',
			// // 	description: "Patient's health parameters saved successfully.",
			// // });
			// // Navigate to the test detail page
			// if (createData) navigate(routes.TEST_PAGE(createData.id));
			// Reset the modal
		}
	}, [status, resetModal]);

	React.useImperativeHandle(
		ref,
		() => {
			return {
				closeModal: () => setOpen(false),
				openModal: () => setOpen(true),
			};
		},
		[]
	);

	return (
		<Modal onCancel={resetModal} title="Save Test" open={open} maskClosable={false} footer={null}>
			<p className="my-3 py-1 text-gray-700 text-sm md:text-base">
				Enter Material Information below to save the test result.
			</p>
			{error && (
				<div>
					<Alert
						message={error.message}
						closable
						onClose={() => setError(null)}
						showIcon
						type="error"
					/>
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();

					handleCreateTest({
						name: form.name,
						length: form.length,
						extension: props.extension,
						forces: props.forces,
						type: props.type,
					});
				}}
				className="mt-6 mb-3 w-full"
			>
				<div className="w-full sm:col-span-3">
					<div className="mt-5 w-full">
						<div>
							<Input
								label="Name of Material"
								required
								id="name"
								name="name"
								disabled={loading}
								onChange={(e) => handleChange('name', e.target.value)}
								placeholder="Enter the name of material"
								value={form.name}
							/>
						</div>
						<div>
							<Input
								label="Length of Material (in mm)"
								id="length"
								name="length"
								disabled={loading}
								required
								type="number"
								onChange={(e) => handleChange('length', e.target.value)}
								placeholder="Length of Material (in mm)"
								value={form.length}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-4 items-center justify-end mt-5 w-full">
					<Button disabled={loading} htmlType="button" type="ghost" onClick={resetModal}>
						Cancel
					</Button>

					<Button disabled={loading} type="primary" size="large" htmlType="submit">
						Save
					</Button>
				</div>
			</form>
		</Modal>
	);
}

const TestsForm = React.forwardRef(FormComponent);

export default TestsForm;

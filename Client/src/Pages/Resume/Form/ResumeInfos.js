import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateResumeToDb, resumeSelector } from '../../../Store/resumeStore';
import {
	TextField,
	Button,
	Tooltip,
	TextareaAutosize,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Skeleton from '../Skeleton';
import { isStringEmpty } from '../../../Helpers/checkFormat';
import useCheckResumeState from '../useCheckResumeState';

const initialSoft = {
	value: '',
	id: '',
};

const initialSkill = {
	value: '',
	id: '',
};

const initialExpertises = [
	{
		expertiseKey: 'programming',
		name: 'Programming Languages',
		skills: [],
	},
	{
		expertiseKey: 'jsFramwork',
		name: 'JS Frameworks & Librairies',
		skills: [],
	},
	{
		expertiseKey: 'cssFramwork',
		name: 'CSS Frameworks',
		skills: [],
	},
	{
		expertiseKey: 'services',
		name: 'Services',
		skills: [],
	},
	{
		expertiseKey: 'database',
		name: 'Database',
		skills: [],
	},
	{
		expertiseKey: 'controlVersion',
		name: 'Control Version',
		skills: [],
	},
	{
		expertiseKey: 'productivity',
		name: 'Productivity',
		skills: [],
	},
];

const ResumeInfos = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const resumeHolded = useSelector(resumeSelector);

	const initialState = {
		position: resumeHolded.position || '',
		portfolio: resumeHolded.portfolio || '',
		introduction: resumeHolded.introduction || '',
		socialMedias: resumeHolded.socialMedia || '',
		expertises:
			resumeHolded.expertises?.length === 0
				? initialExpertises
				: resumeHolded.expertises,
		softSkills: resumeHolded.softSkills || [],
	};

	const [postionError, setPositionError] = useState(false);
	const [programmingSkill, setProgrammingSkill] = useState(initialSkill);
	const [jsFramworkSkill, setJsFramworkSkill] = useState(initialSkill);
	const [cssFramworkSkill, setCssFramworkSkill] = useState(initialSkill);
	const [servicesSkill, setServicesSkill] = useState(initialSkill);
	const [databaseSkill, setDatabaseSkill] = useState(initialSkill);
	const [controlVersionSkill, setControlVersionSkill] = useState(initialSkill);
	const [productivitySkill, setProductivitySkill] = useState(initialSkill);
	const [softSkill, setSoftSkill] = useState(initialSoft);
	const [disabled, setDisabled] = useState(true);

	const [resumeInfos, setResumeInfos] = useState(initialState);

	const { resumeState } = useCheckResumeState();

	useEffect(() => {
		if (isStringEmpty(resumeInfos.position)) setDisabled(true);
		else setDisabled(false);
	}, [resumeInfos]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setResumeInfos({ ...resumeInfos, [name]: value });
	};

	const removeItemFromResume = (listKey, item) => {
		setResumeInfos({
			...resumeInfos,
			[listKey]: resumeInfos[listKey].filter((elmt) => elmt.id !== item.id),
		});
	};

	const removeSkillFromExpertises = (skill) => {
		setResumeInfos({
			...resumeInfos,
			expertises: [...resumeInfos.expertises].map(
				(expert) =>
					(expert = {
						...expert,
						skills: expert.skills.filter((skl) => skl.id !== skill.id),
					})
			),
		});
	};

	const addSkillToExpertises = (key, skill, resetSkill) => {
		if ([skill].value !== '') {
			let expertisesCopy = resumeInfos.expertises.map((expertise) => {
				if (expertise.expertiseKey === key) {
					expertise = { ...expertise, skills: [...expertise.skills, skill] };
				}
				return expertise;
			});

			setResumeInfos({
				...resumeInfos,
				expertises: expertisesCopy,
			});
			resetSkill();
		}
	};

	const setExpertisesChips = () => {
		let filteredExpertises = resumeInfos?.expertises?.filter(
			(expert) => expert.skills.length > 0
		);

		if (filteredExpertises?.length > 0) {
			filteredExpertises = filteredExpertises.map(
				(filteredExpert) =>
					(filteredExpert = {
						chips: [...filteredExpert.skills],
						title: filteredExpert.name,
						onDelete: (skill) => removeSkillFromExpertises(skill),
					})
			);
		}

		return filteredExpertises;
	};

	const handleSubmit = () => {
		if (isStringEmpty(resumeInfos.position)) return setPositionError(true);
		else {
			resumeState === 'complete' &&
				setResumeInfos({ ...resumeInfos, state: 'complete' });
			dispatch(updateResumeToDb(resumeInfos, resumeHolded._id));
			setTimeout(
				() => history.push('/resume/form/work-experience-infos'),
				2000
			);
		}
	};

	return (
		<Skeleton
			mainTitle='About your profile'
			next='/resume/form/work-experience-infos'
			previewChips={setExpertisesChips()}
			previewList={[
				{
					labels: resumeInfos.softSkills,
					title: 'Soft Skills',
					onDelete: (label) => removeItemFromResume('softSkills', label),
				},
			]}>
			<h3>Position *</h3>
			<TextField
				error={postionError}
				type='text'
				helperText={postionError && 'A position must be defined'}
				value={resumeInfos.position}
				size='small'
				fullWidth
				style={{ color: '#574b90' }}
				name='position'
				onChange={(e) => {
					postionError && setPositionError(false);
					handleChange(e, 'text');
				}}
			/>
			<div style={{ marginTop: '30px' }}>
				<h3>Introduction</h3>
				<TextareaAutosize
					style={{ width: '90%', marginTop: '5px' }}
					name='introduction'
					rowsMax={6}
					rowsMin={3}
					placeholder='Tell about yourself in few words'
					defaultValue={resumeInfos.introduction}
					onChange={(e) => handleChange(e, 'text')}
				/>
			</div>
			<div style={{ marginTop: '30px' }}>
				<h3>Portfolio / Website </h3>
				<TextField
					value={resumeInfos.portfolio}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='portfolio'
					onChange={(e) => handleChange(e, 'text')}
				/>
			</div>
			<div style={{ marginTop: '30px' }}>
				<h3>Social Medias Links </h3>
				<TextField
					helperText='LinkedIn, Twitter, etc...'
					value={resumeInfos.socialMedias}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='socialMedias'
					onChange={(e) => handleChange(e, 'text')}
				/>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>Programming Languages</h3>
				<TextField
					helperText='write your core skill and add'
					value={programmingSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='programming'
					onChange={(e) =>
						setProgrammingSkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() => {
							addSkillToExpertises('programming', programmingSkill, () =>
								setProgrammingSkill(initialSkill)
							);
						}}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>JS Frameworks and Librairies</h3>
				<TextField
					helperText='write your core skill and add'
					value={jsFramworkSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='jsFramwork'
					onChange={(e) =>
						setJsFramworkSkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() =>
							addSkillToExpertises('jsFramwork', jsFramworkSkill, () =>
								setJsFramworkSkill(initialSkill)
							)
						}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>CSS Frameworks</h3>
				<TextField
					helperText='write your core skill and add'
					value={cssFramworkSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='cssFramwork'
					onChange={(e) =>
						setCssFramworkSkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() =>
							addSkillToExpertises('cssFramwork', cssFramworkSkill, () =>
								setCssFramworkSkill(initialSkill)
							)
						}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>Services</h3>
				<TextField
					helperText='write your core skill and add'
					value={servicesSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='services'
					onChange={(e) =>
						setServicesSkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() =>
							addSkillToExpertises('services', servicesSkill, () =>
								setServicesSkill(initialSkill)
							)
						}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>Database</h3>
				<TextField
					helperText='write your core skill and add'
					value={databaseSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='database'
					onChange={(e) =>
						setDatabaseSkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() =>
							addSkillToExpertises('database', databaseSkill, () =>
								setDatabaseSkill(initialSkill)
							)
						}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>Controle Version</h3>
				<TextField
					helperText='write your core skill and add'
					value={controlVersionSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='controlVersion'
					onChange={(e) =>
						setControlVersionSkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() =>
							addSkillToExpertises('controlVersion', controlVersionSkill, () =>
								setControlVersionSkill(initialSkill)
							)
						}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>Productivity</h3>
				<TextField
					helperText='write your core skill and add'
					value={productivitySkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='productivity'
					onChange={(e) =>
						setProductivitySkill({
							value: e.target.value,
							id: Date.now().toString(),
						})
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() =>
							addSkillToExpertises('productivity', productivitySkill, () =>
								setProductivitySkill(initialSkill)
							)
						}
					/>
				</Tooltip>
			</div>
			<div style={{ marginTop: '30px', position: 'relative' }}>
				<h3>Others Skills </h3>
				<TextField
					helperText='write your soft skill and add'
					value={softSkill.value}
					size='small'
					fullWidth
					style={{ color: '#574b90' }}
					name='softSkills'
					onChange={(e) =>
						setSoftSkill({ value: e.target.value, id: Date.now().toString() })
					}
				/>
				<Tooltip title='click to add skill'>
					<AddCircleOutlineIcon
						style={{
							position: 'absolute',
							right: '10px',
							fontSize: '22px',
							color: '#786fa6',
							cursor: 'pointer',
						}}
						onClick={() => {
							if (softSkill.value !== '') {
								setResumeInfos({
									...resumeInfos,
									softSkills: [...resumeInfos.softSkills, softSkill],
								});
								setSoftSkill(initialSoft);
							}
						}}
					/>
				</Tooltip>
			</div>
			<div
				style={{
					marginTop: '30px',
					display: 'flex',
					justifyContent: 'flex-end',
				}}>
				<Button
					disabled={disabled}
					style={{ color: '#574b90' }}
					startIcon={
						<SaveIcon style={{ color: '#574b90', fontSize: '30px' }} />
					}
					variant='outlined'
					onClick={() => handleSubmit()}>
					Save and Next
				</Button>
			</div>
		</Skeleton>
	);
};

export default ResumeInfos;

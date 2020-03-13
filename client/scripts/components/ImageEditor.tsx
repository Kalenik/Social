import InputField from '@components/FormComponents/InputField';
import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import CheckMarkButton from './Buttons/SvgButtons/CheckMarkButton';
import XMarkButton from './Buttons/SvgButtons/XMarkButton';
import RotateArrowIconButton from './Buttons/SvgIconButtons/RotateArrowIconButton';

interface IImageEditor {
	imageToEdit: File;
	className?: string;
	handleEditing: (imageEditor: AvatarEditor) => void;
	closeImageEditor: () => void;
}

const ImageEditor: React.FC<IImageEditor> = ({
	imageToEdit,
	className = 'image-editor',
	handleEditing,
	closeImageEditor
}) => {
	const [imageEditor, setImageEditor] = useState<AvatarEditor>(),
		[scale, setScale] = useState(1),
		[rotate, setRotate] = useState(0);

	const setEditor = (imageEditor: AvatarEditor): void =>
		setImageEditor(() => imageEditor);

	const onScaleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
		setScale(() => parseFloat(e.target.value));

	const onRotateChange = (): void =>
		setRotate(prevRotate => (prevRotate === 270 ? 0 : prevRotate + 90));

	const onEdit = (): void => imageEditor && handleEditing(imageEditor);

	return (
		<div className={className}>
			<AvatarEditor
				ref={setEditor}
				image={imageToEdit}
				width={200}
				height={200}
				borderRadius={100}
				scale={scale}
				rotate={rotate}
				style={{ borderRadius: '50%' }}
			/>
			<div className={`${className}__editors-actions`}>
				<div className={`${className}__editors`}>
					<InputField
						type='range'
						name='scale'
						isLabelShow={false}
						value={scale}
						min={1}
						max={10}
						step={0.01}
						onChange={onScaleChange}
						className={`${className}__scale`}
					/>
					<RotateArrowIconButton
						className={`${className}__rotate`}
						onClick={onRotateChange}
						onKeyPress={onRotateChange}
					/>
				</div>
				<div className={`${className}__actions`}>
					<CheckMarkButton
						className={`${className}__button`}
						onClick={onEdit}
					/>
					<XMarkButton
						className={`${className}__button`}
						onClick={closeImageEditor}
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageEditor;

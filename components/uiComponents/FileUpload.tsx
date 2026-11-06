import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import styled, { keyframes } from 'styled-components';

// ==========================================
// Types
// ==========================================
export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface FileUploadProps {
  onUpload?: (files: FileItem[]) => void;
  onEdit?: (file: FileItem) => void;
  maxFiles?: number;
  accept?: string;
}

// ==========================================
// Animations
// ==========================================
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// ==========================================
// Styled Components
// ==========================================
const Container = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  box-sizing: border-box;
`;

const DropZone = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${(props) => (props.$isDragging ? '#4f46e5' : '#cbd5e1')};
  background-color: ${(props) => (props.$isDragging ? '#f5f3ff' : '#f8fafc')};
  border-radius: 12px;
  padding: 36px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  animation: ${(props) => (props.$isDragging ? pulse : 'none')} 1.5s infinite ease-in-out;

  &:hover {
    border-color: #6366f1;
    background-color: #f5f3ff;
  }
`;

const DropIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  color: #6366f1;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const DropTitle = styled.p`
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

const DropSubtext = styled.p`
  margin: 0;
  font-size: 13px;
  color: #64748b;
`;

const BrowseButton = styled.span`
  color: #4f46e5;
  text-decoration: underline;
  font-weight: 600;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StripCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  animation: ${fadeIn} 0.3s ease-out forwards;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
`;

const FileIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background-color: #e0e7ff;
  color: #4338ca;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FileName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.span`
  font-size: 12px;
  color: #64748b;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  color: ${(props) => (props.$variant === 'delete' ? '#ef4444' : '#64748b')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$variant === 'delete' ? '#fee2e2' : '#f1f5f9'};
    color: ${(props) => (props.$variant === 'delete' ? '#dc2626' : '#1e293b')};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const UploadSection = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeIn} 0.25s ease-out;
`;

const UploadButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 6px 12px -2px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    box-shadow: none;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// ==========================================
// Helper Functions
// ==========================================
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ==========================================
// Component
// ==========================================
export const FileUploadComponent: React.FC<FileUploadProps> = ({
  onUpload,
  onEdit,
  maxFiles,
  accept,
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const mappedFiles: FileItem[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((prev) => {
      const updated = [...prev, ...mappedFiles];
      return maxFiles ? updated.slice(0, maxFiles) : updated;
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditClick = (fileItem: FileItem) => {
    if (onEdit) {
      onEdit(fileItem);
    }
  };

  const handleUploadClick = () => {
    if (onUpload && files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <Container>
      <DropZone
        $isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <DropIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </DropIcon>
        <DropTitle>
          Drag & drop files here, or <BrowseButton>browse</BrowseButton>
        </DropTitle>
        <DropSubtext>Supports any file format up to your system limit</DropSubtext>
        <HiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept={accept}
        />
      </DropZone>

      {files.length > 0 && (
        <>
          <FileList>
            {files.map((fileItem) => (
              <StripCard key={fileItem.id}>
                <FileInfo>
                  <FileIconWrapper>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </FileIconWrapper>
                  <FileDetails>
                    <FileName>{fileItem.name}</FileName>
                    <FileSize>{formatFileSize(fileItem.size)}</FileSize>
                  </FileDetails>
                </FileInfo>

                <ActionsContainer>
                  <IconButton
                    type="button"
                    $variant="edit"
                    title="Edit File"
                    onClick={() => handleEditClick(fileItem)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </IconButton>
                  <IconButton
                    type="button"
                    $variant="delete"
                    title="Delete File"
                    onClick={() => handleDelete(fileItem.id)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </IconButton>
                </ActionsContainer>
              </StripCard>
            ))}
          </FileList>

          <UploadSection>
            <UploadButton type="button" onClick={handleUploadClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload Files
            </UploadButton>
          </UploadSection>
        </>
      )}
    </Container>
  );
};

export default FileUploadComponent;
import React from 'react';
import styled, { keyframes } from 'styled-components';

// ==========================================
// Types
// ==========================================
export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  commentsCount: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  color: string;
  tasks: Task[];
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
}

// ==========================================
// Animations
// ==========================================
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ==========================================
// Styled Components
// ==========================================
const BoardContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;

const ColumnWrapper = styled.div`
  background-color: #f1f5f9;
  border-radius: 16px;
  width: 340px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 48px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  animation: ${fadeIn} 0.4s ease-out;
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px 20px;
  border-bottom: 1px solid #e2e8f0;
`;

const HeaderTitleContainer = styled.div<{ $indicatorColor: string }>`
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: block;
    width: 3px;
    height: 16px;
    background-color: ${(props) => props.$indicatorColor};
    border-radius: 2px;
  }
`;

const TitleText = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
`;

const CountBadge = styled.span`
  background-color: #e2e8f0;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
`;

const TasksGrid = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const TaskCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }
`;

const CardTopSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
`;

const WavTag = styled.span`
  display: inline-block;
  background-color: #f1f5f9;
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
`;

const TaskTitle = styled.h4`
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
`;

const TaskDescription = styled.p`
  margin: 0 0 14px 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DueDateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  font-size: 12px;
  color: #475569;
  font-weight: 500;
`;

const CardBottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fafafa;
`;

const AssigneeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const AssigneeName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #334155;
`;

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 12px;
  font-weight: 500;

  svg {
    width: 14px;
    height: 14px;
  }
`;

// ==========================================
// Mock Data (matching your inspiration layout)
// ==========================================
const mockColumns: KanbanColumn[] = [
  {
    id: 'upcoming',
    title: 'Upcoming Tasks',
    count: 7,
    color: '#ef4444', // Red indicator
    tasks: [
      {
        id: 'task-1',
        code: 'WAV - 01',
        title: 'Fix Login Bug',
        description: 'Resolve the 401 error when users sign in with Google account integration.',
        dueDate: 'Due: 16 May',
        assignee: {
          name: 'Raj Singh',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        },
        commentsCount: 4,
      },
      {
        id: 'task-2',
        code: 'WAV - 02',
        title: 'Refactor API Calls',
        description: 'Optimize frontend request lifecycle and implement React Query cache layers.',
        dueDate: 'Due: 17 May',
        assignee: {
          name: 'Sarah Connor',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
        },
        commentsCount: 2,
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    count: 2,
    color: '#3b82f6', // Blue indicator
    tasks: [
      {
        id: 'task-3',
        code: 'WAV - 03',
        title: 'Design New Modal',
        description: 'Create high-fidelity mocks for the project creation workflow and confirmation steps.',
        dueDate: 'Due: 18 May',
        assignee: {
          name: 'Alex Brown',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        },
        commentsCount: 2,
      },
    ],
  },
  {
    id: 'completed',
    title: 'Completed',
    count: 5,
    color: '#10b981', // Green indicator
    tasks: [
      {
        id: 'task-4',
        code: 'WAV - 05',
        title: 'Update Color Palette',
        description: 'Refine primary brand colors for better accessibility across secondary buttons.',
        dueDate: 'Due: 20 May',
        assignee: {
          name: 'Jane Smith',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
        },
        commentsCount: 6,
      },
    ],
  },
];

// ==========================================
// Component
// ==========================================
export const KanbanBoardComponent: React.FC<{ columns?: KanbanColumn[] }> = ({
  columns = mockColumns,
}) => {
  return (
    <BoardContainer>
      {columns.map((column) => (
        <ColumnWrapper key={column.id}>
          <ColumnHeader>
            <HeaderTitleContainer $indicatorColor={column.color}>
              <TitleText>{column.title}</TitleText>
            </HeaderTitleContainer>
            <CountBadge>{column.count}</CountBadge>
          </ColumnHeader>

          <TasksGrid>
            {column.tasks.map((task) => (
              <TaskCard key={task.id}>
                <CardTopSection>
                  <WavTag>{task.code}</WavTag>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                  <DueDateBadge>
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {task.dueDate}
                  </DueDateBadge>
                </CardTopSection>

                <CardBottomSection>
                  <AssigneeInfo>
                    <Avatar src={task.assignee.avatar} alt={task.assignee.name} />
                    <AssigneeName>{task.assignee.name}</AssigneeName>
                  </AssigneeInfo>
                  <CommentsContainer>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    {task.commentsCount}
                  </CommentsContainer>
                </CardBottomSection>
              </TaskCard>
            ))}
          </TasksGrid>
        </ColumnWrapper>
      ))}
    </BoardContainer>
  );
};

export default KanbanBoardComponent;
import React from 'react'

interface StepProps {
  title: string
  description?: string
  isCompleted?: boolean
  isActive?: boolean
}

export const Step: React.FC<StepProps> = ({ title, description, isCompleted, isActive }) => {
  return (
    <div className={`flex items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
      <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 ${
        isCompleted ? 'bg-blue-600 border-blue-600' : isActive ? 'border-blue-600' : 'border-gray-300'
      }`}>
        {isCompleted ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
            {title[0]}
          </span>
        )}
      </div>
      <div className="ml-4 flex flex-col">
        <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>{title}</span>
        {description && <span className="text-sm text-gray-500">{description}</span>}
      </div>
    </div>
  )
}

interface StepsProps {
  children: React.ReactElement<StepProps>[]
  currentStep: number
}

export const Steps: React.FC<StepsProps> = ({ children, currentStep }) => {
  return (
    <div className="flex flex-col space-y-4">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<StepProps>(child)) {
          return React.cloneElement(child, {
            isCompleted: index < currentStep - 1,
            isActive: index === currentStep - 1,
          })
        }
        return child
      })}
    </div>
  )
}


"use client"

interface DeleteButtonProps {
  action: () => void
  label?: string
}

export function DeleteButton({ action, label = "Delete" }: DeleteButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (confirm("Are you sure you want to delete this project?")) {
      action()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
    >
      {label}
    </button>
  )
}


"use client"

export default function TableShrimer() {
  return (
    <div className="w-full space-y-4 p-4">
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
        <div>BUSINESS</div>
        <div className="text-center">PROFILE COMPLETION</div>
        <div className="text-center">RATING</div>
        <div className="text-center">ACTIVATION CODE</div>
        <div className="text-center">TRANSPORT</div>
        <div className="text-center">INDUSTRY</div>
        <div className="text-center">ACTIONS</div>
      </div>

      {/* Shimmer Rows */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg border bg-card p-4"
        >
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
                <div className="h-3 w-32 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
                <div className="h-3 w-28 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-gray-200 animate-pulse"></div>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 w-5 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
              ))}
            </div>

            {/* Activation Code */}
            <div className="flex justify-center">
              <div className="h-8 w-20 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
            </div>

            {/* Transport */}
            <div className="flex justify-center">
              <div className="h-6 w-24 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
            </div>

            {/* Industry */}
            <div className="flex justify-center">
              <div className="h-8 w-24 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
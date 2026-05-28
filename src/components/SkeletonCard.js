function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100" />
          <div>
            <div className="h-4 w-40 bg-gray-100 rounded-full mb-2" />
            <div className="h-3 w-24 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-6 w-20 bg-gray-100 rounded-full" />
      </div>
      <div className="flex gap-3 mb-4">
        <div className="h-3 w-24 bg-gray-100 rounded-full" />
        <div className="h-3 w-20 bg-gray-100 rounded-full" />
        <div className="h-3 w-16 bg-gray-100 rounded-full" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-100 rounded-full" />
        <div className="h-6 w-20 bg-gray-100 rounded-full" />
        <div className="h-6 w-14 bg-gray-100 rounded-full" />
      </div>
      <div className="flex justify-between pt-3 border-t border-gray-50">
        <div className="h-4 w-28 bg-gray-100 rounded-full" />
        <div className="h-4 w-16 bg-gray-100 rounded-full" />
      </div>
    </div>
  );
}

export default SkeletonCard;

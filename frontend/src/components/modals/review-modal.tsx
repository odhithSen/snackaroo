import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, ArrowUpDown, Laugh } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { RestaurantReview } from "src/models/restaurant-review";
import { useApi } from "src/hooks/useApi";
import Swal from "sweetalert2";
import { PageLoader } from "../page-loader";
// import { PageLoader } from "../page-loader";

interface ReviewModalProps {
  restaurantId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  restaurantId,
  isOpen,
  onClose,
}) => {
  const reviewRequest = useApi({
    endpoint: `public/restaurants/${restaurantId}/reviews?page=1&limit=999`,
    isPublic: true,
    dependencies: [],
  });

  if (reviewRequest.loading) {
    return <div />;
  }

  if (reviewRequest.error) {
    console.error("Error getting reviews", reviewRequest.error.message);
    Swal.fire({
      title: "Error!",
      text: "An Error Occurred while fetching reviews",
      icon: "error",
    });
  }

  const reviews: RestaurantReview[] = reviewRequest.data?.reviews ?? [];

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const roundedRating = Math.round(averageRating * 10) / 10;

  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);

  const maxCount = Math.max(...Object.values(ratingCounts));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 flex flex-row items-center justify-center border-b">
          <DialogTitle className="text-lg font-semibold">Reviews</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden flex flex-col px-6 py-4">
          <div className="mb-6 border-b border-gray-200">
            <div className="flex items-start mb-4 text-[#4d7c1b]">
              <div className="mr-8 ml-3">
                <span className="text-5xl font-bold ">
                  {roundedRating.toFixed(1)}
                </span>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 mr-[2px] ${
                        star <= Math.round(averageRating)
                          ? " fill-[#4d7c1b]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {reviews.length}+ reviews
                </span>
              </div>
              <div className="flex-grow space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <span className="w-3 mr-2 text-xs text-gray-500">
                      {rating}
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-[6px]">
                      <div
                        className="bg-[#4d7c1b] h-[6px] rounded-full"
                        style={{
                          width: `${
                            ((ratingCounts[rating] || 0) / maxCount) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="font-bold flex justify-between items-center  my-4 pb-5 border-b border-gray-200">
            <span>All reviews</span>
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <ArrowUpDown className="h-4 w-4 text-teal-500" />
            </Button>
          </div>

          <ScrollArea className="flex-grow -mx-6 px-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="w-7 h-7 mr-2">
                      {review.user.profile_picture_url && (
                        <AvatarImage
                          src={review.user.profile_picture_url}
                          alt={review.user.first_name}
                        />
                      )}
                      <AvatarFallback>
                        {review.user.first_name.charAt(0) +
                          review.user.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-normal">
                        {review.user.first_name} - Snakaroo customer
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 mr-[2px] ${
                                star <= review.rating
                                  ? "text-[#4d7c1b] fill-[#4d7c1b]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-md mb-2 pt-3">{review.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {review.tags &&
                      review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#e4f2d4] text-green-800 text-[14px] rounded-md flex items-center"
                        >
                          <Laugh className="h-5 w-5 mr-2" />
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="p-4 mt-auto">
          <Button
            onClick={onClose}
            className="w-full font-bold text-md py-6 bg-teal-500 hover:bg-teal-600 text-white "
          >
            Back to menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;

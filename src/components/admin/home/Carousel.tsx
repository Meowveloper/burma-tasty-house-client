import { Carousel } from "flowbite-react";
interface IProps {
  images : Array<string | undefined>;
}
export function CarouselComponent(props : IProps) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {props.images.map((image, i) => (
          <img src={image ? image : "/image-placeholder.jpg"} alt="..." key={i} />
        ))}
      </Carousel>
    </div>
  );
}

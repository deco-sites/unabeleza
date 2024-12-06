interface BreadcrumbProps {
  pageTitle: string;
}

export default function Breadcrumb({ pageTitle }: BreadcrumbProps) {
  return (
    <div>
      <p className="font-[Montserrat] font-[16px] absolute top-[230px] left-[calc(80px_+_((100vw_-_min(96rem,100vw))_/_2))] mobile:left-[20px] mobile:text-[14px]">
        Home /{" "}
        <b className="text-black text-[16px] leading-6 mobile:text-[14px]">
          {pageTitle}
        </b>
      </p>
    </div>
  );
}

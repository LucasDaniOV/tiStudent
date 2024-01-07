import { Resource } from "@/types";
import { Profile } from "@/types/index";
import { useTranslation } from "next-i18next";
import Thumbnail from "./Thumbnail";
import Likes from "../likes/likes";
import FileDownloadComponent from "../FileDownloadComponent";
import Link from "next/link";
import Comments from "../comments/Comments";
import CommentCreateForm from "../comments/CommentCreateForm";

type Props = {
  resource: Resource;
  profile: Profile;
  creator: Profile;
};

const ResourceID: React.FC<Props> = ({ resource, profile, creator }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-5 divide-gray-700">
        <div>
          <h1 className="text-3xl">{resource.title}</h1>
          <div>{`${resource.updatedAt}`.split("T", 1)}</div>
        </div>

        <hr />

        <div className="flex gap-5">
          <div className="h-24">
            <Thumbnail filePath={creator.picture} />
          </div>
          <div className="flex flex-col">
            <Link className="text-2xl w-max text-blue-500 hover:text-blue-300" href={`/profiles/${creator.id}`}>
              {creator.username}
            </Link>
            <span>Joined: {`${creator.createdAt}`.split("T", 1)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p>{resource.description}</p>
          <div className="h-40">
            <Thumbnail filePath={resource.thumbNail} />
          </div>
          <FileDownloadComponent fileName={resource.filePath} />
          <Likes profileId={profile.id} object="resource" likesObjects={resource.likes} resourceId={resource.id} />
        </div>

        <hr />

        <CommentCreateForm resource={resource} profile={profile} />

        <Comments object="resource" commentsProp={resource.comments} resourceId={resource.id} generation={0} />
      </div>
    </>
  );
};

export default ResourceID;

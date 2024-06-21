import { Metadata } from "next";
import { ICollab } from "@/types/Collab";
import { PageTitle } from "@/components/PageTitle";
import { CommentIcon } from "@/ui/CommentIcon";
import { CollabsListItem } from "@/components/CollabsListItem";

import styles from "./Collab.module.scss";
import { getServerSession } from "next-auth";
import authOptions from "@/app/utils/auth";
import { CollabPageContent } from "@/app/collabs/[id]/CollabPageContent";
import { Api } from "@/api";
import { IUser } from "@/types/User";

const getCollab = async (id: string, login: string) => {
  await Api().collab.incrementViews(id, login);

  return await Api().collab.getOne(id);
};

export const metadata: Metadata = {
  title: "Коллаб",
  icons: {
    icon: "/favicons/collabs-page.svg",
  },
};

const Collab = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as IUser;
  const collab: ICollab = await getCollab(params.id, user?.login);

  const { comments, totalComments } = await Api().collab.getInitialComments(
    params.id,
    5
  );

  return (
    <main className="container">
      <div className={styles.collabContainer}>
        <CollabsListItem {...collab} isCollabPage={true} />
      </div>
      <PageTitle title="Комментарии">
        <CommentIcon />
      </PageTitle>
      <CollabPageContent
        initialComments={comments}
        user={session?.user}
        collab={collab}
        initialTotalComments={totalComments}
      />
    </main>
  );
};

export default Collab;

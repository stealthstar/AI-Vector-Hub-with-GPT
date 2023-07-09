import {useEffect, useState} from "react";
import {IndexCard} from "./IndexCard";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "../ui/tabs";
import {Button} from "../ui/button";
import {ArrowBigDownDash} from "lucide-react";
import {KeyConfiguration} from "@/types/keyConfiguration";
import {Index} from "@/types/index";
import {IndexSkeleton} from "./IndexSkeleton";

interface Props {
  keyConfiguration: KeyConfiguration;
  handleKeyConfigurationValidation: () => boolean;
  handleShowIndexFormTabs: (isShowIndexFormTabs: boolean) => void;
  onIndexChange: (index: Index) => void;
}

export const IndexGallery = (
  {
    keyConfiguration,
    handleKeyConfigurationValidation,
    handleShowIndexFormTabs,
    onIndexChange
  }: Props) => {
  const [page, setPage] = useState(1);
  const [indexes, setIndexes] = useState<Index[]>([])
  const [isIndexesLoading, setIsIndexesLoading] = useState(true);
  const [userIndexes, setUserIndexes] = useState<Index[]>([])
  const [isUserIndexesLoading, setIsUserIndexesLoading] = useState(true);
  const [userLikedIndexes, setUserLikedIndexes] = useState<Index[]>([])

  useEffect(() => {
    const fetchAllIndexes = async () => {
      const response = await fetch(`/api/indexes?page=${page}`)
      const data = await response.json();
      setIndexes([...indexes, ...data]);
      setIsIndexesLoading(false);
    };
    fetchAllIndexes();
  }, [page]);

  useEffect(() => {
    const fetchUserIndexes = async () => {
      const response = await fetch(`/api/indexes/user`)
      const data = await response.json();
      setUserIndexes(data);
      setIsUserIndexesLoading(false);
    };
    fetchUserIndexes();
  }, []);

  useEffect(() => {
    const fetchUserLikedIndexes = async () => {
      const response = await fetch(`/api/indexes/user/likes`)
      const data = await response.json();
      setUserLikedIndexes(data);
    };
    fetchUserLikedIndexes();
  }, []);

  function handleLoadMore() {
    setPage(page + 1);
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6 pb-48">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold text-black tracking-tight dark:text-white">My created vector</h2>
        </div>
        <Tabs defaultValue="created" className="space-y-4">
          <TabsList>
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="likeed">Liked</TabsTrigger>
          </TabsList>
          {isUserIndexesLoading ? (
              <IndexSkeleton/>
            ) :
            <TabsContent value="created" className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
                {userIndexes.map((index) => (
                  <IndexCard key={index.id} index={index} onIndexChange={onIndexChange}/>
                ))}
              </div>
            </TabsContent>
          }

          <TabsContent value="likeed" className="space-y-4">
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
              {userLikedIndexes.map((index) => (
                <IndexCard key={index.id} index={index} onIndexChange={onIndexChange}/>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl text-black font-bold tracking-tight dark:text-white">Vector Hub</h2>
        </div>
        {isIndexesLoading ? (
            <IndexSkeleton/>
          ) :
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
            {indexes.map((index) => (
              <IndexCard key={index.id} index={index} onIndexChange={onIndexChange}/>
            ))}
          </div>

        }

        {indexes.length >= 20 && (
          <div className="flex justify-center text-black dark:text-white">
            <Button variant="outline" onClick={handleLoadMore}>
              <ArrowBigDownDash className="mr-2 h-4 w-4"/> Load More
            </Button>
          </div>
        )}

      </div>
    </>
  )
}
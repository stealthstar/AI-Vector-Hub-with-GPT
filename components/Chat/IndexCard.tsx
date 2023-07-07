import {FC, useCallback, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Heart} from "lucide-react";
import {Index} from "../../types/index";
import {Button} from "@/components/ui/button";
import {LlamaIndex} from "@/types/llamaIndex";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { MouseEvent } from 'react';
import { Badge } from "../ui/badge";

interface Props {
  onIndexChange: (index: LlamaIndex) => void;
  index: Index
}

export const IndexCard: FC<Props> = ({index, onIndexChange}: Props) => {

  const handleLikeIndex = () => {
    console.log("asdfds")
  };

  return (
    <>
      <Card className="rounded-xs cursor-pointer h-48 max-h-64 space-y-4 m-1 shadow-md hover:shadow-lg dark:bg-neutral-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" onClick={() => onIndexChange({indexName: index.name, indexId: index.id})}>
          <CardTitle className="text-xl font-bold">
            {index.name}
          </CardTitle>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={index.author?.image ? index.author?.image : 'https://avatars.githubusercontent.com/u/138222923'}/>
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{index.author?.name ? index.author?.name : 'unknown'}</p>
              </div>
            </div>
        </CardHeader>
        <CardContent onClick={() => onIndexChange({indexName: index.name, indexId: index.id})}>
          <div className="text-sm font-medium">{index.description}</div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center space-x-2 w-full">
            <div className="rounded-none mr-1">
              { index.tags && index.tags.length > 0 && (
                <>
                  { index.tags.map((tag, key) => (
                    <Badge key={key} variant="outline" className="mr-1">{tag}</Badge>
                  )) }
                </>
              )}
            </div>
            <div>
              <Button variant="ghost" onClick={handleLikeIndex}>
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
import {ChatFolder} from "@/types/chat";
import {Conversation} from "@/types/conversation";
import {cleanConversationHistory} from '@/utils/app/clean';
import {IconFileImport} from '@tabler/icons-react';
import {useTranslation} from 'next-i18next';
import {FC} from 'react';
import {SidebarButton} from './SidebarButton';
import {Button} from "@/components/ui/button";
import {ImportIcon} from "lucide-react";

interface Props {
  onImport: (data: {
    conversations: Conversation[];
    folders: ChatFolder[];
  }) => void;
}

export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');
  return (
    <>
      <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        onChange={(e) => {
          if (!e.target.files?.length) return;

          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            let json = JSON.parse(e.target?.result as string);

            if (json && !json.folders) {
              json = { history: cleanConversationHistory(json), folders: [] };
            }

            onImport({ conversations: json.history, folders: json.folders });
          };
          reader.readAsText(file);
        }}
      />

      <Button className="w-full justify-start" variant="ghost" onClick={() => {
        const importFile = document.querySelector(
          '#import-file',
        ) as HTMLInputElement;
        if (importFile) {
          importFile.click();
        }
      }}>
        <ImportIcon className="mr-2"/>{t('Import conversations')}
      </Button>
    </>
  );
};

import { fetchEvents } from '@/lib/cms';
import { NewsroomClient } from './NewsroomClient';

export default async function NewsroomPage() {
  const events = await fetchEvents();
  return <NewsroomClient events={events} />;
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useGetAllLessons, useAddLesson } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Plus, BookOpen } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function LessonManager() {
  const { data: lessons, isLoading } = useGetAllLessons();
  const addMutation = useAddLesson();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [unitId, setUnitId] = useState('1');
  const [order, setOrder] = useState('1');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addMutation.mutateAsync({
        unitId: BigInt(unitId),
        title,
        content,
        order: BigInt(order),
      });
      toast.success('Lesson added successfully');
      setTitle('');
      setContent('');
      setOrder('1');
    } catch (error) {
      toast.error('Failed to add lesson');
      console.error(error);
    }
  };

  const groupedLessons = lessons?.reduce((acc, lesson) => {
    const unit = Number(lesson.associatedUnit);
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(lesson);
    return acc;
  }, {} as Record<number, typeof lessons>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Lesson Manager</h2>
        <p className="text-muted-foreground">
          Add new lessons and manage existing ones
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Lesson
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label htmlFor="lesson-title">Lesson Title</Label>
              <Input
                id="lesson-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter lesson title"
                required
              />
            </div>
            <div>
              <Label htmlFor="lesson-content">Lesson Content</Label>
              <Textarea
                id="lesson-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter lesson content"
                rows={8}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lesson-unit">Associated Unit</Label>
                <Select value={unitId} onValueChange={setUnitId}>
                  <SelectTrigger id="lesson-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Unit 1</SelectItem>
                    <SelectItem value="1">Unit 2</SelectItem>
                    <SelectItem value="2">Unit 3</SelectItem>
                    <SelectItem value="3">Unit 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lesson-order">Order</Label>
                <Input
                  id="lesson-order"
                  type="number"
                  min="1"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="Lesson order"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Lesson
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Lessons</h3>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : groupedLessons && Object.keys(groupedLessons).length > 0 ? (
          <div className="space-y-6">
            {[0, 1, 2, 3].map((unitIndex) => {
              const unitLessons = groupedLessons[unitIndex] || [];
              if (unitLessons.length === 0) return null;

              const sortedLessons = [...unitLessons].sort(
                (a, b) => Number(a.order) - Number(b.order)
              );

              return (
                <div key={unitIndex}>
                  <h4 className="text-lg font-semibold mb-3">
                    Unit {unitIndex + 1} Lessons
                  </h4>
                  <div className="space-y-3">
                    {sortedLessons.map((lesson) => (
                      <Card key={Number(lesson.id)}>
                        <CardHeader>
                          <CardTitle className="text-base">
                            {Number(lesson.order)}. {lesson.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {lesson.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No lessons yet</p>
        )}
      </div>
    </div>
  );
}
